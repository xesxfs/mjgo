package com.vequn.net;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.stream.ChunkedWriteHandler;

public class Server {
	private String host;
	private int port;

	public Server(String host, int port) {
		this.host=host;
		this.port=port;
	}

	public void Run() throws Exception{
		EventLoopGroup bossGroup=new NioEventLoopGroup();
		EventLoopGroup workGroup=new NioEventLoopGroup();		
		
		try {
			ServerBootstrap bootstrap = new ServerBootstrap();//构建
			bootstrap.group(bossGroup, workGroup)
			.channel(NioServerSocketChannel.class)
			.option(ChannelOption.SO_BACKLOG,1024)
			.childOption(ChannelOption.TCP_NODELAY, true)// serverSocketchannel的设置，链接缓冲池的大小
			.childOption(ChannelOption.SO_KEEPALIVE, true)// socketchannel的设置,维持链接的活跃，清除死链接
			.childHandler(new ChannelInitializer<SocketChannel>(){
				@Override
				protected void initChannel(SocketChannel ch) throws Exception {
					ch.pipeline().addLast(new HttpServerCodec());
					ch.pipeline().addLast(new HttpObjectAggregator(64*1024));
					ch.pipeline().addLast(new ChunkedWriteHandler());
					ch.pipeline().addLast(new WebSocketSeverHandler(host,port));
				}
				
			});
			ChannelFuture ch = bootstrap.bind(port).sync();
			System.out.println("server start");
			ch.channel().closeFuture().sync();
		}finally{
			bossGroup.shutdownGracefully();
			workGroup.shutdownGracefully();
		}
	}

}
